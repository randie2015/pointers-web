'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

type CmsBackButtonProps = {
  href?: string;
  label?: string;
  onClick?: () => void;
  variant?: 'light' | 'dark';
  className?: string;
};

export function CmsBackButton({
  href,
  label = 'Volver',
  onClick,
  variant = 'light',
  className
}: CmsBackButtonProps) {
  const router = useRouter();

  const styles =
    variant === 'dark'
      ? 'text-white/55 hover:text-white'
      : 'text-gray-500 hover:text-gray-900';

  const baseClassName = cn(
    'mb-6 flex items-center gap-2 text-sm transition-colors',
    styles,
    className
  );

  const content = (
    <>
      <ChevronLeft size={18} aria-hidden />
      <span>{label}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick ?? (() => router.back())}
      className={baseClassName}
    >
      {content}
    </button>
  );
}
