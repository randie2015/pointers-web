function clamp(n: number) {
  return Math.min(255, Math.max(0, Math.round(n)));
}

function parseHex(hex: string): [number, number, number] {
  const raw = hex.replace('#', '').trim();
  const full =
    raw.length === 3
      ? raw
          .split('')
          .map((c) => c + c)
          .join('')
      : raw;

  if (!/^[0-9a-fA-F]{6}$/.test(full)) {
    return [201, 125, 125];
  }

  return [parseInt(full.slice(0, 2), 16), parseInt(full.slice(2, 4), 16), parseInt(full.slice(4, 6), 16)];
}

function toHex(r: number, g: number, b: number) {
  return `#${[r, g, b].map((v) => clamp(v).toString(16).padStart(2, '0')).join('')}`;
}

function mix(hexA: string, hexB: string, t: number) {
  const [ar, ag, ab] = parseHex(hexA);
  const [br, bg, bb] = parseHex(hexB);
  return toHex(ar + (br - ar) * t, ag + (bg - ag) * t, ab + (bb - ab) * t);
}

function darken(hex: string, amount: number) {
  return mix(hex, '#000000', amount);
}

function lighten(hex: string, amount: number) {
  return mix(hex, '#FFFFFF', amount);
}

/** Builds CSS custom properties from primary + accent HEX (dentist). */
export function buildDemoThemeStyle(primary: string, accent: string): Record<string, string> {
  return {
    '--demo-primary': primary,
    '--demo-primary-dark': darken(primary, 0.18),
    '--demo-accent': accent,
    '--demo-accent-deep': darken(accent, 0.14),
    '--demo-soft': lighten(primary, 0.72),
    '--demo-base': mix(lighten(accent, 0.88), '#FAF7F5', 0.55),
    '--demo-ink': '#2E2A2B',
    '--demo-charcoal': '#2E2A2B',
    '--demo-dark': '#1F1B1D',
    '--demo-neutral': mix(accent, '#E8DFD8', 0.65),
    '--demo-surface': '#FFFFFF',
    '--demo-badge': darken(primary, 0.38),
    '--demo-jade': mix(primary, '#197876', 0.55),
    '--demo-muted': '#5C6474',
    '--demo-border': '#E8E2D8'
  };
}

/**
 * Aesthetic theme: primary → navy/ink/dark buttons; accent → sand/gold CTAs;
 * jade derived from primary toward teal.
 */
export function buildAestheticThemeStyle(primary: string, accent: string): Record<string, string> {
  return {
    '--demo-primary': primary,
    '--demo-primary-dark': darken(primary, 0.12),
    '--demo-accent': accent,
    '--demo-accent-deep': darken(accent, 0.14),
    '--demo-soft': lighten(accent, 0.88),
    '--demo-base': '#FAFAFA',
    '--demo-ink': primary,
    '--demo-charcoal': primary,
    '--demo-dark': darken(primary, 0.18),
    '--demo-neutral': mix(accent, '#E8E2D8', 0.55),
    '--demo-surface': '#FFFFFF',
    '--demo-badge': primary,
    '--demo-jade': mix(primary, '#197876', 0.65),
    '--demo-muted': mix(primary, '#5C6474', 0.72),
    '--demo-border': '#E8E2D8'
  };
}
