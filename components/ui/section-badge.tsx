import { cn } from '@/lib/utils';

type SectionBadgeProps = {
  text: string;
  variant?: 'brand' | 'purple' | 'light';
  size?: 'default' | 'compact';
  className?: string;
};

const VARIANT_CLASS = {
  brand: 'badge-carved--brand',
  purple: 'badge-carved--purple',
  light: 'badge-carved--light'
} as const;

export function SectionBadge({
  text,
  variant = 'brand',
  size = 'default',
  className
}: SectionBadgeProps) {
  return (
    <span
      className={cn(
        'badge-carved font-medium',
        VARIANT_CLASS[variant],
        size === 'compact'
          ? 'px-3 py-1 text-xs font-semibold'
          : 'px-4 py-1.5 text-sm md:text-base',
        className
      )}
    >
      {text}
    </span>
  );
}
