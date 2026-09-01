import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        cinzel: ['var(--font-cinzel)', 'Georgia', 'serif']
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
        purple: 'hsl(var(--purple))',
        rey: {
          base: '#F1F1F2',
          neutral: '#BCBABE',
          accent: '#A1D6E2',
          primary: '#1995AD',
          ink: '#1E293B',
          dark: '#0F172A'
        },
        ortho: {
          base: '#F8FAFC',
          surface: '#FFFFFF',
          neutral: '#CBD5E1',
          primary: '#0284C7',
          gold: '#D4A373',
          ink: '#334155',
          dark: '#0F2137'
        },
        ale: {
          ivory: '#FAF7F5',
          rose: '#E8B4B8',
          cta: '#C97D7D',
          gold: '#C5A059',
          ink: '#2E2A2B',
          neutral: '#E8DFD8',
          surface: '#FFFFFF',
          dark: '#2E2A2B'
        }
      },
      letterSpacing: { tightest: '-0.04em' },
      borderRadius: { '4xl': '2rem' }
    }
  },
  plugins: []
} satisfies Config;
