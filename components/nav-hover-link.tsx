'use client';

import { Link, usePathname } from '@/i18n/routing';
import { motion } from 'framer-motion';
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
      className={cn('group relative touch-press rounded-xl px-4 py-2 max-md:px-5 max-md:py-3', className)}
    >
      <motion.span
        className="pointer-events-none absolute inset-0 rounded-xl bg-white/0"
        initial={false}
        whileHover={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
        whileTap={{ backgroundColor: 'rgba(255,255,255,0.18)', scale: 0.98 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
      <span
        className={cn(
          'relative z-[1] block text-sm font-medium text-white/90 transition-colors duration-200 group-hover:text-white max-md:text-base',
          active && 'text-white'
        )}
      >
        {label}
      </span>
      <motion.span
        className="absolute bottom-1 left-1/2 z-[1] h-[2px] rounded-full bg-white"
        initial={{ width: active ? '60%' : '0%', x: '-50%', opacity: active ? 1 : 0 }}
        whileHover={{ width: '65%', opacity: 1 }}
        transition={{ type: 'spring', stiffness: 420, damping: 28 }}
        aria-hidden
      />
    </Link>
  );
}
