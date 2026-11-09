/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // World Passport brand palette — taken from the logo
        // Primary: logo navy (hero bands, navbar, primary buttons, headings)
        navy: {
          DEFAULT: '#1F2F5F',
          950: '#0D1530',
          900: '#16213F',
          800: '#182651',
          700: '#2A3D75',
          600: '#34498A',
          500: '#5468A8',
          200: '#C7CFE6',
          100: '#E3E8F4',
          50: '#F1F4FA',
        },
        // Logo red — call-to-action buttons and emphasis
        brand: {
          DEFAULT: '#E01F26',
          dark: '#BB1A20',
          light: '#EF5A5F',
          50: '#FDECEC',
        },
        // Amber — small highlights only (stars, chips, badges)
        gold: {
          DEFAULT: '#E8A317',
          dark: '#A8740A',
          light: '#F6C95C',
          100: '#FBEACB',
          50: '#FDF6E7',
        },
        // Soft neutral section backgrounds
        cream: {
          DEFAULT: '#F7F8FB',
          100: '#EFF1F7',
          200: '#E3E7F0',
        },
        // Section tints derived from the brand colours
        pastel: {
          pink: '#FBEDEE',
          peach: '#F8F2E7',
          sky: '#EAEFF8',
          lavender: '#EFEDF7',
          mint: '#E8F4F0',
        },
        ink: {
          DEFAULT: '#1D2233',
          muted: '#5A6175',
          soft: '#8B92A5',
        },
        primary: { DEFAULT: '#1F2F5F', dark: '#182651', light: '#34498A' },
        accent: { DEFAULT: '#E01F26', dark: '#BB1A20', light: '#EF5A5F' },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 6px rgba(22,33,63,0.04), 0 8px 24px rgba(22,33,63,0.06)',
        lift: '0 4px 10px rgba(22,33,63,0.06), 0 20px 44px rgba(22,33,63,0.12)',
        cta: '0 8px 20px rgba(224,31,38,0.28)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        floaty: 'floaty 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

module.exports = config;
