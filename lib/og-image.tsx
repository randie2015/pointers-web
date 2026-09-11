import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import {
  OG_COPY,
  OG_THUMBNAIL_HEIGHT,
  OG_THUMBNAIL_WIDTH,
  type OgCopy,
  type OgLocale
} from '@/lib/og';

export const OG_IMAGE_SIZE = {
  width: OG_THUMBNAIL_WIDTH,
  height: OG_THUMBNAIL_HEIGHT
} as const;

export const OG_IMAGE_CONTENT_TYPE = 'image/png';

const DOT_GRID_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="627">
  <defs>
    <pattern id="og-dots" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="1.25" cy="1.25" r="0.9" fill="#F8FAFC"/>
    </pattern>
  </defs>
  <rect width="1200" height="627" fill="url(#og-dots)" opacity="0.3"/>
</svg>`;

function toDataUri(svg: string, mime = 'image/svg+xml') {
  return `data:${mime};base64,${Buffer.from(svg).toString('base64')}`;
}

async function loadLogoSrc() {
  const svg = (await readFile(join(process.cwd(), 'assets/brand/logo-horizontal.svg'), 'utf8'))
    .replace(/<style>[\s\S]*?<\/style>/, '')
    .replace(/class="cls-1"/g, 'fill="#ffffff"');
  return toDataUri(svg);
}

async function loadFonts() {
  const fontDir = join(process.cwd(), 'assets/fonts');
  const [medium, regular] = await Promise.all([
    readFile(join(fontDir, 'inter-latin-500-normal.woff')),
    readFile(join(fontDir, 'inter-latin-400-normal.woff'))
  ]);

  return [
    { name: 'Inter', data: medium, weight: 500 as const, style: 'normal' as const },
    { name: 'Inter', data: regular, weight: 400 as const, style: 'normal' as const }
  ];
}

function Corner({
  top,
  right,
  bottom,
  left
}: {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}) {
  const style: Record<string, number | string> = {
    position: 'absolute',
    display: 'flex',
    width: 56,
    height: 56
  };
  if (top != null) {
    style.top = top;
    style.borderTop = '1.25px solid rgba(248,250,252,0.22)';
  }
  if (bottom != null) {
    style.bottom = bottom;
    style.borderBottom = '1.25px solid rgba(248,250,252,0.22)';
  }
  if (left != null) {
    style.left = left;
    style.borderLeft = '1.25px solid rgba(248,250,252,0.22)';
  }
  if (right != null) {
    style.right = right;
    style.borderRight = '1.25px solid rgba(248,250,252,0.22)';
  }
  return <div style={style} />;
}

function OgMarkup({ copy, logoSrc }: { copy: OgCopy; logoSrc: string }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#07080C',
        color: '#F8FAFC',
        fontFamily: 'Inter',
        position: 'relative',
        overflow: 'hidden',
        padding: '56px 64px'
      }}
    >
      <img
        src={toDataUri(DOT_GRID_SVG)}
        width={OG_THUMBNAIL_WIDTH}
        height={OG_THUMBNAIL_HEIGHT}
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          backgroundImage:
            'radial-gradient(ellipse 58% 72% at 84% 16%, rgba(188,38,86,0.34) 0%, rgba(188,38,86,0.14) 36%, transparent 68%)'
        }}
      />

      <Corner top={36} left={36} />
      <Corner top={36} right={36} />
      <Corner bottom={36} left={36} />
      <Corner bottom={36} right={36} />

      <div
        style={{
          position: 'absolute',
          top: 70,
          bottom: 70,
          left: 0,
          width: 1,
          display: 'flex',
          backgroundImage: 'linear-gradient(to bottom, transparent, rgba(188,38,86,0.7), transparent)'
        }}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#94A3B8'
        }}
      >
        <div style={{ display: 'flex' }}>{copy.category}</div>
        <div style={{ display: 'flex', margin: '0 8px', color: '#475569' }}>//</div>
        <div style={{ display: 'flex' }}>{copy.studio}</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '78%' }}>
        <div
          style={{
            display: 'flex',
            fontSize: 36,
            fontWeight: 500,
            lineHeight: 1.12,
            letterSpacing: '-0.03em',
            color: '#FFFFFF'
          }}
        >
          {copy.title}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 16,
            width: 52,
            height: 1,
            backgroundColor: '#BC2656'
          }}
        />
        <div
          style={{
            display: 'flex',
            marginTop: 16,
            maxWidth: 640,
            fontSize: 18,
            fontWeight: 400,
            lineHeight: 1.5,
            color: '#CBD5E1'
          }}
        >
          {copy.description}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'flex-end',
          justifyContent: 'space-between'
        }}
      >
        <img src={logoSrc} width={176} height={32} />
        <div
          style={{
            display: 'flex',
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#64748B'
          }}
        >
          pointers.marketing
        </div>
      </div>
    </div>
  );
}

export async function generateOgImage(locale: OgLocale = 'es') {
  const [logoSrc, fonts] = await Promise.all([loadLogoSrc(), loadFonts()]);

  return new ImageResponse(<OgMarkup copy={OG_COPY[locale]} logoSrc={logoSrc} />, {
    ...OG_IMAGE_SIZE,
    fonts
  });
}
