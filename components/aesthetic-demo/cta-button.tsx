import Link from 'next/link';
import { cn } from '@/lib/utils';

type AestheticCtaButtonProps = {
  href: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'nav';
  className?: string;
  external?: boolean;
  fullWidth?: boolean;
  shimmer?: boolean;
};

export function AestheticCtaButton({
  href,
  label,
  variant = 'primary',
  className,
  external = true,
  fullWidth = false,
  shimmer = true
}: AestheticCtaButtonProps) {
  const base = cn(
    'group relative inline-flex min-h-11 items-center justify-center overflow-hidden rounded-full px-5 py-3 text-center text-xs font-semibold tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] sm:min-h-[44px] sm:px-7 sm:text-sm',
    fullWidth ? 'w-full sm:w-auto' : 'w-full max-w-full sm:w-auto'
  );

  const variants = {
    primary: 'bg-demo-primary text-white shadow-md shadow-demo-primary/20 hover:bg-demo-primary/90',
    nav: 'bg-demo-primary text-white shadow-sm hover:bg-demo-primary/90',
    secondary:
      'border border-demo-primary/25 bg-white text-demo-ink hover:border-demo-accent hover:bg-demo-base',
    accent: 'bg-demo-accent text-demo-ink shadow-md shadow-demo-accent/30 hover:bg-demo-accent/90'
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
