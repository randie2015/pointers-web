import Link from 'next/link';
import { Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';

type BlogEditLinkProps = {
  postId: string;
  label: string;
  className?: string;
};

export function BlogEditLink({ postId, label, className }: BlogEditLinkProps) {
  return (
    <Link
      href={`/admin/dashboard/blog?edit=${encodeURIComponent(postId)}`}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-white/90 px-2.5 py-1.5 text-xs font-semibold text-gray-700 shadow-sm backdrop-blur-sm transition hover:border-brand/40 hover:text-brand',
        className
      )}
    >
      <Pencil size={13} aria-hidden />
      {label}
    </Link>
  );
}
