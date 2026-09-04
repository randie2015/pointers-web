import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './src/**/*.{ts,tsx}', './demos/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        cinzel: ['var(--font-cinzel)', 'Georgia', 'serif'],
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        jakarta: ['var(--font-jakarta)', 'system-ui', 'sans-serif']
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
        demo: {
          primary: 'var(--demo-primary)',
          'primary-dark': 'var(--demo-primary-dark)',
          accent: 'var(--demo-accent)',
          'accent-deep': 'var(--demo-accent-deep)',
          soft: 'var(--demo-soft)',
          base: 'var(--demo-base)',
          ink: 'var(--demo-ink)',
          charcoal: 'var(--demo-charcoal)',
          dark: 'var(--demo-dark)',
          neutral: 'var(--demo-neutral)',
          surface: 'var(--demo-surface)',
          badge: 'var(--demo-badge)'
        },
        mag: {
          sand: '#C5A57D',
          navy: '#192031',
          'navy-deep': '#121929',
          white: '#FFFFFF',
          cream: '#FAFAFA',
          jade: '#197876',
          ink: '#192031',
          muted: '#5C6474',
          border: '#E8E2D8'
        }
      },
      letterSpacing: { tightest: '-0.04em' },
      borderRadius: { '4xl': '2rem' },
      keyframes: {
        'mag-shimmer': {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(120%)' }
        },
        'mag-gold-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(197, 168, 128, 0.45)' },
          '50%': { boxShadow: '0 0 0 14px rgba(197, 168, 128, 0)' }
        }
      },
      animation: {
        'mag-shimmer': 'mag-shimmer 1.8s ease-in-out infinite',
        'mag-gold-pulse': 'mag-gold-pulse 2.4s ease-in-out infinite'
      }
    }
  },
  plugins: []
} satisfies Config;
