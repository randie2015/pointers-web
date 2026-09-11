import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { OgThumbnail } from '@/components/og/og-thumbnail';
import { OG_COPY, resolveOgLocale } from '@/lib/og';

export const metadata: Metadata = {
  title: 'OG Thumbnail Preview | Pointers',
  robots: { index: false, follow: false }
};

export default async function OgPreviewPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = OG_COPY[resolveOgLocale(locale)];

  return (
    <section className="relative z-[1] container-page pb-24 pt-28 md:pt-32">
      <header className="mx-auto max-w-[1200px]">
        <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
          Open Graph // 1200 × 627
        </p>
        <h1 className="mt-3 font-display text-2xl font-medium tracking-tight text-white md:text-3xl">
          Link preview thumbnail
        </h1>
      </header>

      <div className="mx-auto mt-10 max-w-[1200px] overflow-hidden rounded-2xl border border-white/[0.08] shadow-[0_28px_80px_rgba(0,0,0,0.45)]">
        <OgThumbnail
          title={copy.title}
          description={copy.description}
          category={copy.category}
          studio={copy.studio}
        />
      </div>

      <div className="mx-auto mt-14 max-w-[420px]">
        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-slate-500">
          Responsive · card scale
        </p>
        <div className="overflow-hidden rounded-xl border border-white/[0.08]">
          <OgThumbnail
            title={copy.title}
            description={copy.description}
            category={copy.category}
            studio={copy.studio}
          />
        </div>
      </div>
    </section>
  );
}
