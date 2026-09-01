import Link from 'next/link';
import { cn } from '@/lib/utils';

type WhatsAppButtonProps = {
  href: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'light';
  className?: string;
  external?: boolean;
};

export function ReyDentalCtaButton({
  href,
  label,
  variant = 'primary',
  className,
  external = true
}: WhatsAppButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.98]';

  const variants = {
    primary: 'bg-rey-primary text-white shadow-md hover:bg-rey-primary/90 hover:shadow-lg',
    secondary:
      'border-2 border-rey-neutral bg-transparent text-rey-ink hover:border-rey-primary hover:text-rey-primary',
    light: 'bg-white text-rey-primary shadow-md hover:bg-rey-accent/30'
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
