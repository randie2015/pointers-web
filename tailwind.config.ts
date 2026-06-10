import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'system-ui', 'sans-serif']
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        border: 'hsl(var(--border))',
        accent: 'hsl(var(--accent))',
        brand: {
          DEFAULT: 'hsl(var(--brand))',
          foreground: 'hsl(var(--brand-foreground))'
        },
        teal: 'hsl(var(--teal))',
        purple: 'hsl(var(--purple))'
      },
      letterSpacing: { tightest: '-0.04em' },
      borderRadius: { '4xl': '2rem' }
    }
  },
  plugins: []
} satisfies Config;
