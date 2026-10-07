/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FBF8F3',
          100: '#F4EBDD', // Primary cream foundation
          200: '#EFE3D0', // Warm paper
          300: '#E5D5BD',
          400: '#DCC7A6', // Warm beige
        },
        paper: '#EFE3D0',
        beige: {
          DEFAULT: '#DCC7A6',
          light: '#F4EBDD',
          warm: '#E2CEB0',
          dark: '#BFA885',
        },
        coffee: {
          light: '#A37E5F',
          muted: '#8A684D', // Muted brown
          DEFAULT: '#6B4A32', // Coffee
          dark: '#453022',
          roast: '#2A1D16', // Dark coffee
          espresso: '#1B1410', // Espresso
          black: '#120D0A',
        },
        ink: {
          900: '#1B1410',
          800: '#2A1D16',
          700: '#3D2B20',
          600: '#5A4334',
          500: '#6B4A32',
          400: '#8A684D',
          300: '#AA8A6F',
          200: '#CBB299',
          100: '#E8DCCE',
        },
        accent: {
          terracotta: '#C85A32',
          amber: '#D97706',
          sage: '#4D7C5F',
          rust: '#993D22',
          gold: '#C59B27',
          forest: '#2E5339',
          blue: '#3B6E8C',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Instrument Serif"', '"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
        pixel: ['"Press Start 2P"', '"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px -2px rgba(42, 29, 22, 0.08)',
        'warm-md': '0 8px 24px -6px rgba(42, 29, 22, 0.12)',
        'warm-lg': '0 16px 40px -10px rgba(42, 29, 22, 0.16)',
        'warm-inner': 'inset 0 2px 4px 0 rgba(42, 29, 22, 0.06)',
      },
      backgroundImage: {
        'paper-grain': 'radial-gradient(circle at 1px 1px, rgba(107, 74, 50, 0.07) 1px, transparent 0)',
        'notebook-grid': 'linear-gradient(to right, rgba(107, 74, 50, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(107, 74, 50, 0.05) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
