import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1A3A6E',
          dark: '#111E3C',
          mid: '#1E4080',
        },
        brand: {
          blue: '#2762C8',
          light: '#4B96E8',
          pale: '#EBF4FF',
          glass: '#BBDCFF',
          card: '#213A7A',
          panel: '#1E3570',
        },
      },
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body: ['var(--font-jakarta)', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
      },
      boxShadow: {
        tooth: '0 0 60px rgba(74,150,232,0.35), 0 0 120px rgba(74,150,232,0.12)',
        glass: '0 8px 32px rgba(39,98,200,0.14), 0 2px 8px rgba(39,98,200,0.08)',
        card: '0 4px 32px rgba(26,58,110,0.1), 0 1px 4px rgba(26,58,110,0.05)',
        blue: '0 20px 60px rgba(39,98,200,0.25), 0 4px 16px rgba(39,98,200,0.15)',
      },
    },
  },
  plugins: [],
}

export default config
