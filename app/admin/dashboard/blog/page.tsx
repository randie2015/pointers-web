import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { BlogManager } from '@/components/admin/blog-manager';

export const dynamic = 'force-dynamic';

function BlogManagerFallback() {
  return (
    <div className="flex items-center justify-center gap-2 px-6 py-16 text-white/50">
      <Loader2 size={18} className="animate-spin" />
      Cargando artículos…
    </div>
  );
}

export default function AdminBlogPage() {
  return (
    <Suspense fallback={<BlogManagerFallback />}>
      <BlogManager />
    </Suspense>
  );
}
