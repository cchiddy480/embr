/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Embr branding colors
        primary: {
          50: '#e6f7f6',
          100: '#b3ece7',
          200: '#80e0d8',
          300: '#4dd5c9',
          400: '#26cbbd',
          500: '#0F766E', // Embr teal
          600: '#0c5c56',
          700: '#09423e',
          800: '#062926',
          900: '#101926', // Embr dark background
        },
        accent: {
          500: '#1FA89F',
          600: '#38F9E4',
        },
        background: '#101926',
        foreground: '#FEFEFE',
        gray: {
          100: '#ededed',
          200: '#6c757d',
          300: '#212529',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
} 