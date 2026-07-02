import { DOG_PATHS, DOG_VIEWBOX } from '@/components/services/dog-path';
import { cn } from '@/lib/utils';

type HeaderLogoProps = {
  className?: string;
};

export function HeaderLogo({ className }: HeaderLogoProps) {
  return (
    <span className={cn('inline-flex flex-row items-center gap-2 text-white', className)}>
      <svg
        viewBox={DOG_VIEWBOX}
        className="h-7 w-auto shrink-0 sm:h-8 md:h-9"
        aria-hidden
        focusable="false"
      >
        {DOG_PATHS.map((path, index) => (
          <path key={index} d={path} fill="currentColor" />
        ))}
      </svg>
      <span className="select-none text-[1.05rem] font-bold uppercase leading-none tracking-[0.14em] sm:text-[1.1rem] md:text-[1.2rem]">
        POINTERS
      </span>
    </span>
  );
}
