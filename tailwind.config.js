/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f7f7f5',
          100: '#edecea',
          200: '#d9d7d2',
          300: '#c0bcb4',
          400: '#a39e93',
          500: '#8d867a',
          600: '#7a736a',
          700: '#655f57',
          800: '#544f4a',
          900: '#484440',
          950: '#272523',
        },
        forest: {
          50: '#f3f6f3',
          100: '#e3e9e3',
          200: '#c7d4c8',
          300: '#a1b5a3',
          400: '#78937b',
          500: '#587a5c',
          600: '#436147',
          700: '#364e3a',
          800: '#2d3f30',
          900: '#263429',
          950: '#131c16',
        },
        earth: {
          50: '#faf8f5',
          100: '#f2ede5',
          200: '#e4d9ca',
          300: '#d3c0a8',
          400: '#bfa384',
          500: '#b08d6b',
          600: '#a37b5e',
          700: '#88654f',
          800: '#6f5344',
          900: '#5b453a',
          950: '#30231e',
        },
        tomtly: {
          dark: '#1a1a1a',
          light: '#fafaf8',
          accent: '#2d5a3d',
          gold: '#c4a35a',
          warm: '#f5f0e8',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'score-fill': {
          '0%': { strokeDashoffset: '283' },
          '100%': { strokeDashoffset: 'var(--score-offset)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'score-fill': 'score-fill 1.5s ease-out forwards',
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'slide-in': 'slide-in 0.4s ease-out forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
