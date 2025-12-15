import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        xl1300: '1300px',
      },
      fontFamily: {
        sans: [
          'SVN-Gilroy',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
        gilroy: ['SVN-Gilroy', 'sans-serif'],
      },
      spacing: {
        5: '1.25rem',
      },
      colors: {
        primary: 'var(--color-primary)',
        gray: {
          50: '#8E98A8',
          200: '#F2F6F9',
          500: '#8294A2',
          900: '#041F34',
        },
        blue: {
          50: '#E6EEF4',
          100: '#B0CCDE',
          200: '#8AB3CD',
          500: '#005993',
          900: '#005186',
          darker: '#00253E',
        },
        red: {
          50: '#FFDDE7',
          100: '#F3B6C7',
          200: '#ED92AB',
          500: '#D71249',
          900: '#C41042',
        },
        green: {
          50: '#EDF8EC',
          100: '#C8E9C5',
          200: '#87D082',
          500: '#4CB944',
          900: '#45A83E',
        },
        black: '#041F34',
      },
      boxShadow: {
        sm: '2px 2px 8px 0px #0000000D',
        md: '0px 4px 8px 0px #0000001A',
        lg: '0px 12px 16px 0px #0000001A',
        xl: '0px 20px 24px 0px #0000001A',
      },
      maxWidth: {
        '8xl': '90rem',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
  corePlugins: {
    preflight: false,
  },
  darkMode: 'class',
} satisfies Config;

export default config;
