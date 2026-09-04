import Link from 'next/link';
import { cn } from '@/lib/utils';

type ClinicCtaButtonProps = {
  href: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'secondary-dark' | 'light' | 'outline-gold';
  className?: string;
  external?: boolean;
  fullWidth?: boolean;
};

export function ClinicCtaButton({
  href,
  label,
  variant = 'primary',
  className,
  external = true,
  fullWidth = false
}: ClinicCtaButtonProps) {
  const base = cn(
    'inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 text-center text-xs font-semibold tracking-wide transition-all duration-300 active:scale-[0.98] sm:min-h-0 sm:px-7 sm:text-sm',
    fullWidth ? 'w-full sm:w-auto' : 'w-full max-w-full sm:w-auto'
  );

  const variants = {
    primary:
      'bg-demo-primary text-white shadow-md shadow-demo-primary/25 hover:bg-demo-primary/90 hover:shadow-lg',
    secondary:
      'border border-demo-accent/60 bg-demo-base/80 text-demo-ink backdrop-blur-sm hover:border-demo-accent hover:bg-white',
    'secondary-dark':
      'border border-white/35 bg-white/10 text-white backdrop-blur-sm hover:border-white/55 hover:bg-white/15',
    light: 'bg-white text-demo-primary shadow-md hover:bg-demo-base',
    'outline-gold': 'border-2 border-demo-accent bg-transparent text-demo-ink hover:bg-demo-accent/10'
  };

  const props = external ? { target: '_blank' as const, rel: 'noopener noreferrer' as const } : {};

  if (href.startsWith('/') && !external) {
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
