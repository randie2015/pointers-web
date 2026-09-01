import Link from 'next/link';
import { cn } from '@/lib/utils';

type WhatsAppButtonProps = {
  href: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'light';
  className?: string;
  external?: boolean;
  fullWidth?: boolean;
};

export function OrthozentCtaButton({
  href,
  label,
  variant = 'primary',
  className,
  external = true,
  fullWidth = false
}: WhatsAppButtonProps) {
  const base = cn(
    'inline-flex min-h-11 items-center justify-center rounded-full px-4 py-3 text-center text-xs font-semibold transition-all duration-200 active:scale-[0.98] sm:min-h-0 sm:px-6 sm:text-sm',
    fullWidth ? 'w-full sm:w-auto' : 'w-full max-w-full sm:w-auto'
  );

  const variants = {
    primary: 'bg-ortho-primary text-white shadow-md hover:bg-ortho-primary/90 hover:shadow-lg',
    secondary:
      'border-2 border-ortho-neutral bg-transparent text-ortho-ink hover:border-ortho-primary hover:text-ortho-primary',
    light: 'bg-white text-ortho-primary shadow-md hover:bg-ortho-gold/30'
  };

  const props = external
    ? { target: '_blank' as const, rel: 'noopener noreferrer' as const }
    : {};

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
