'use client';

import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type NavHoverLinkProps = {
  href: string;
  label: string;
  isActive: boolean;
  layoutId: string;
  onActivate: () => void;
  onClick?: () => void;
  className?: string;
};

export function NavHoverLink({
  href,
  label,
  isActive,
  layoutId,
  onActivate,
  onClick,
  className
}: NavHoverLinkProps) {
  return (
    <Link
      href={href as '/'}
      onClick={onClick}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      className={cn(
        'relative px-4 py-2 text-sm font-medium text-white transition-colors',
        className
      )}
    >
      {isActive && (
        <motion.div
          layoutId={layoutId}
          className="absolute inset-0 z-0 rounded-lg bg-white/30"
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </Link>
  );
}
