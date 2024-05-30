const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('node:path');
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html,md,svg}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    fontSize: {
      xs: [
        'var(--fs-xs)',
        {
          lineHeight: '1rem',
        },
      ],
      sm: [
        'var(--fs-sm)',
        {
          lineHeight: '1.5rem',
        },
      ],
      base: [
        'var(--fs-base)',
        {
          lineHeight: '1.5rem',
        },
        {
          lineHeight: '1.75rem',
        },
      ],
      lg: [
        'var(--fs-lg)',
        {
          lineHeight: '2rem',
        },
      ],
      xl: [
        'var(--fs-xl)',
        {
          lineHeight: '2rem',
        },
      ],
      '2xl': [
        'var(--fs-2xl)',
        {
          lineHeight: '2rem',
        },
      ],
      '3xl': [
        // '2rem',
        'var(--fs-3xl)',
        {
          lineHeight: '2.5rem',
        },
      ],
      '4xl': [
        'var(--fs-4xl)',
        {
          lineHeight: '3.5rem',
        },
      ],
      '5xl': [
        'var(--fs-5xl)',
        {
          lineHeight: '3.5rem',
        },
      ],
      '6xl': [
        'var(--fs-6xl)',
        {
          lineHeight: '4rem',
        },
      ],
      '7xl': [
        'var(--fs-7xl)',
        {
          lineHeight: '5.5rem',
        },
      ],
    },
    extend: {
      boxShadow: {
        thick: '0px 7px 32px rgb(0 0 0 / 35%);',
      },
      colors: {
        primary: '#101010',
        secondary: '#1a1a1a',
        tertiary: '#262626',
        white: '#ececec',
        gray: colors.gray,
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
        '6xl': '5rem',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      container: {
        center: true,
        screens: {
          sm: '100%',
          md: '100%',
          lg: '640px',
          xl: '768px',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
