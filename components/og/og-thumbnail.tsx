import { useId } from 'react';
import { DEFAULT_OG_COPY, OG_THUMBNAIL_HEIGHT, OG_THUMBNAIL_WIDTH } from '@/lib/og';
import { cn } from '@/lib/utils';

export { OG_THUMBNAIL_HEIGHT, OG_THUMBNAIL_WIDTH };

type OgThumbnailProps = {
  title?: string;
  description?: string;
  category?: string;
  studio?: string;
  className?: string;
};

function CartesianDotGrid({ patternId }: { patternId: string }) {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={patternId}
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
        >
          <circle cx="1.25" cy="1.25" r="0.9" fill="#F8FAFC" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} shapeRendering="geometricPrecision" />
    </svg>
  );
}

function ViewfinderCorners({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 627"
      preserveAspectRatio="none"
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        fill="none"
        stroke="rgba(248,250,252,0.22)"
        strokeWidth="1.25"
        strokeLinecap="square"
        vectorEffect="non-scaling-stroke"
      >
        <path d="M36 92 V36 H92" />
        <path d="M1164 92 V36 H1108" />
        <path d="M36 535 V591 H92" />
        <path d="M1164 535 V591 H1108" />
      </g>
    </svg>
  );
}

export function OgThumbnail({
  title = DEFAULT_OG_COPY.title,
  description = DEFAULT_OG_COPY.description,
  category = DEFAULT_OG_COPY.category,
  studio = DEFAULT_OG_COPY.studio,
  className
}: OgThumbnailProps) {
  const patternId = `og-cartesian-${useId().replace(/:/g, '')}`;

  return (
    <article
      className={cn(
        'relative isolate aspect-[1200/627] w-full overflow-hidden bg-[#07080C]',
        className
      )}
      style={{ containerType: 'inline-size', aspectRatio: '1200 / 627' }}
      aria-label={`${category}. ${title}`}
    >
      <CartesianDotGrid patternId={patternId} />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 58% 72% at 84% 16%, rgba(188,38,86,0.34) 0%, rgba(188,38,86,0.14) 36%, transparent 68%)'
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[6%] -top-[28%] h-[78%] w-[48%] rounded-full bg-[#BC2656] opacity-25 blur-[110px]"
      />

      <ViewfinderCorners />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-[11%] left-0 w-px bg-gradient-to-b from-transparent via-[#BC2656]/70 to-transparent"
      />

      <div className="relative z-10 flex h-full min-w-0 flex-col justify-between px-[clamp(1.25rem,6.2cqi,3.75rem)] py-[clamp(1.1rem,5.4cqi,3.25rem)]">
        <p className="text-[clamp(0.625rem,1.85cqi,0.75rem)] font-medium uppercase tracking-widest text-slate-400">
          {category}
          <span className="mx-1.5 text-slate-600" aria-hidden>
            //
          </span>
          {studio}
        </p>

        <div className="min-w-0 max-w-[78%]">
          <h2 className="line-clamp-2 font-sans text-[clamp(1.15rem,4.6cqi,1.875rem)] font-medium leading-[1.12] tracking-tight text-white">
            {title}
          </h2>
          <div
            aria-hidden
            className="mt-[clamp(0.6rem,1.8cqi,0.9rem)] h-px w-[clamp(2.25rem,8cqi,3.25rem)] bg-[#BC2656]"
          />
          <p className="mt-[clamp(0.65rem,2cqi,1rem)] line-clamp-2 max-w-[36rem] font-sans text-[clamp(0.72rem,2.15cqi,0.875rem)] leading-relaxed text-slate-300">
            {description}
          </p>
        </div>

        <div className="flex items-end justify-between gap-4">
          <img
            src="/brand/logo-horizontal.svg"
            alt="Pointers"
            width={576}
            height={103}
            className="h-[clamp(1.05rem,3.1cqi,1.85rem)] w-auto shrink-0"
            draggable={false}
          />
          <span className="min-w-0 truncate font-sans text-[clamp(0.5rem,1.6cqi,0.625rem)] uppercase tracking-[0.22em] text-slate-500">
            pointers.marketing
          </span>
        </div>
      </div>
    </article>
  );
}
