/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        winter: {
          primary: '#A5F2F3',
          secondary: '#D4F1F9',
          accent: '#C0C0C0',
        },
        christmas: {
          primary: '#146B3A',
          secondary: '#EA4630',
          accent: '#FFD700',
        },
        newyear: {
          primary: '#F7E7CE',
          secondary: '#000000',
          accent: '#E8E8E8',
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