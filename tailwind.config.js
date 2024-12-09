/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        winter: {
          light: '#A5F2F3',
          DEFAULT: '#D4F1F9',
          silver: '#C0C0C0',
        },
        christmas: {
          green: '#146B3A',
          red: '#EA4630',
          gold: '#FFD700',
        },
        newyear: {
          gold: '#F7E7CE',
          silver: '#E8E8E8',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        serif: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      scale: {
        '102': '1.02',
      },
      animation: {
        'snowfall': 'snowfall 10s linear infinite',
        'twinkle': 'twinkle 1.5s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'bubble': 'bubble 4s ease-in-out infinite',
        'firework': 'firework 1.5s ease-out forwards',
      },
    },
  },
  plugins: [],
};