'use client';

import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import type { AppRoute } from '@/lib/navigation';

type NavLinkProps = {
  href: AppRoute;
  label: string;
  onClick?: () => void;
  className?: string;
};

export function NavHoverLink({ href, label, onClick, className }: NavLinkProps) {
  const pathname = usePathname();
  const active = pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <Link
      href={href}
      prefetch
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'rounded-lg px-4 py-2 text-sm font-medium text-white/95 transition-colors hover:text-white active:text-white',
        active && 'text-white',
        className
      )}
    >
      {label}
    </Link>
  );
}
