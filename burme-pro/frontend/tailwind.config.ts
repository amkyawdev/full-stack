import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0a0e17',
        foreground: '#ffffff',
        card: {
          DEFAULT: '#111827',
          foreground: '#ffffff',
        },
        primary: {
          DEFAULT: '#00f2fe',
          foreground: '#0a0e17',
        },
        secondary: {
          DEFAULT: '#1e293b',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#1e293b',
          foreground: '#94a3b8',
        },
        accent: {
          DEFAULT: '#00f2fe',
          foreground: '#0a0e17',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
        border: '#1e293b',
        input: '#1e293b',
        ring: '#00f2fe',
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
        },
        purple: {
          400: '#c084fc',
          500: '#a855f7',
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 10px rgba(0, 242, 254, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 20px rgba(0, 242, 254, 0.6)',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
      },
      boxShadow: {
        'neon': '0 0 10px rgba(0, 242, 254, 0.5), 0 0 20px rgba(0, 242, 254, 0.3), 0 0 30px rgba(0, 242, 254, 0.1)',
        'neon-lg': '0 0 20px rgba(0, 242, 254, 0.5), 0 0 40px rgba(0, 242, 254, 0.3), 0 0 60px rgba(0, 242, 254, 0.1)',
      },
    },
  },
  plugins: [],
};

export default config;