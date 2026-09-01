import Link from 'next/link';
import { cn } from '@/lib/utils';

type MagrassCtaButtonProps = {
  href: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'nav';
  className?: string;
  external?: boolean;
  fullWidth?: boolean;
};

export function MagrassCtaButton({
  href,
  label,
  variant = 'primary',
  className,
  external = true,
  fullWidth = false
}: MagrassCtaButtonProps) {
  const base = cn(
    'inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 text-center text-xs font-semibold tracking-wide transition-all duration-300 active:scale-[0.98] sm:min-h-0 sm:px-7 sm:text-sm',
    fullWidth ? 'w-full sm:w-auto' : 'w-full max-w-full sm:w-auto'
  );

  const variants = {
    primary: 'bg-mag-navy text-mag-white shadow-md shadow-mag-navy/20 hover:bg-mag-navy/90',
    nav: 'bg-mag-navy text-mag-white shadow-sm hover:bg-mag-navy/90',
    secondary:
      'border border-mag-navy/25 bg-mag-white text-mag-navy hover:border-mag-sand hover:bg-mag-cream',
    accent: 'bg-mag-sand text-mag-navy shadow-md shadow-mag-sand/30 hover:bg-mag-sand/90'
  };

  const props = external ? { target: '_blank' as const, rel: 'noopener noreferrer' as const } : {};

  if (href.startsWith('#') || (href.startsWith('/') && !external)) {
    return (
      <Link href={href} className={cn(base, variants[variant], className)}>
        {label}
      </Link>
    );
  }

  return (
    <a href={href} className={cn(base, variants[variant], className)} {...(href.startsWith('http') ? props : {})}>
      {label}
    </a>
  );
}
