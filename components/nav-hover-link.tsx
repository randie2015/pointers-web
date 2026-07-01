'use client';

import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

type NavLinkProps = {
  href: '/' | '/nosotros' | '/servicios' | '/contact' | '/blog';
  label: string;
  onClick?: () => void;
  className?: string;
};

export function NavHoverLink({ href, label, onClick, className }: NavLinkProps) {
  return (
    <Link
      href={href}
      prefetch
      onClick={onClick}
      className={cn(
        'rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-white/20 active:bg-white/25',
        className
      )}
    >
      {label}
    </Link>
  );
}
