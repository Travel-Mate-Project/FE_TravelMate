import type {Config} from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green100: '#3FB6A6',
        kakaoBg: '#FEE500',
        gray50: '#F5F8FF',
        gray100: '#CCCCCC',
        gray200: '#999999',
        gray900: '#1A1A1A',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: ['var(--font-pretendard)'],
      },
    },
  },
  plugins: [],
};
export default config;
