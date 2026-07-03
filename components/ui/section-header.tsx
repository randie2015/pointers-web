import { cn } from '@/lib/utils';
import { SectionBadge } from '@/components/ui/section-badge';

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName
}: SectionHeaderProps) {
  return (
    <div className={cn('mx-auto max-w-3xl text-center', className)}>
      {eyebrow && (
        <div className="flex justify-center">
          <SectionBadge text={eyebrow} />
        </div>
      )}
      <h2 className={cn('h-display mt-4 text-2xl sm:text-3xl md:text-5xl lg:text-6xl', titleClassName)}>{title}</h2>
      {subtitle && (
        <p
          className={cn(
            'mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:mt-5 md:text-lg',
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
