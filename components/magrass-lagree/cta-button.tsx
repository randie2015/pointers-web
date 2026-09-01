import Link from 'next/link';
import { cn } from '@/lib/utils';

type MagrassCtaButtonProps = {
  href: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'nav';
  className?: string;
  external?: boolean;
  fullWidth?: boolean;
  shimmer?: boolean;
};

export function MagrassCtaButton({
  href,
  label,
  variant = 'primary',
  className,
  external = true,
  fullWidth = false,
  shimmer = true
}: MagrassCtaButtonProps) {
  const base = cn(
    'group relative inline-flex min-h-11 items-center justify-center overflow-hidden rounded-full px-5 py-3 text-center text-xs font-semibold tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] sm:min-h-0 sm:px-7 sm:text-sm',
    fullWidth ? 'w-full sm:w-auto' : 'w-full max-w-full sm:w-auto'
  );

  const variants = {
    primary: 'bg-mag-navy text-mag-white shadow-md shadow-mag-navy/20 hover:bg-mag-navy/90',
    nav: 'bg-mag-navy text-mag-white shadow-sm hover:bg-mag-navy/90',
    secondary:
      'border border-mag-navy/25 bg-mag-white text-mag-navy hover:border-mag-sand hover:bg-mag-cream',
    accent: 'bg-mag-sand text-mag-navy shadow-md shadow-mag-sand/30 hover:bg-mag-sand/90'
  };

  const showShimmer = shimmer && (variant === 'primary' || variant === 'accent' || variant === 'nav');

  const content = (
    <>
      {showShimmer ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
        />
      ) : null}
      <span className="relative z-10">{label}</span>
    </>
  );

  const props = external ? { target: '_blank' as const, rel: 'noopener noreferrer' as const } : {};

  if (href.startsWith('#') || (href.startsWith('/') && !external)) {
    return (
      <Link href={href} className={cn(base, variants[variant], className)}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={cn(base, variants[variant], className)} {...(href.startsWith('http') ? props : {})}>
      {content}
    </a>
  );
}
