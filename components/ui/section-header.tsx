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
      <h2 className={cn('h-display mt-4 text-3xl md:text-5xl lg:text-6xl', titleClassName)}>{title}</h2>
      {subtitle && (
        <p className={cn('mt-5 mx-auto max-w-2xl text-muted-foreground text-lg leading-relaxed', subtitleClassName)}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
