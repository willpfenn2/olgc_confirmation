import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Cinzel"', '"Trajan Pro"', 'Palatino', 'serif'],
        serif: ['"Cormorant Garamond"', 'Garamond', 'serif'],
      },
      colors: {
        ink: '#0a0a0a',
        parchment: '#faf7f2',
        blood: {
          50:  '#fdf3f3',
          100: '#fbe5e5',
          200: '#f5c6c6',
          300: '#eb9b9b',
          400: '#dc6666',
          500: '#c73a3a',
          600: '#991b1b',
          700: '#7f1d1d',
          800: '#6b1414',
          900: '#4c0f0f',
        },
      },
    },
  },
  plugins: [typography],
};
