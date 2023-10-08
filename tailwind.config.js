/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'main-bg': '#27313C',
        'gray-bg': '#BCC2C4',
        'green-bg': '#26A34F',
        'dark-blue-bg': '#1C2532',
        'dark-green-bg': '#2C464B',
        'dark-gray-bg': '#898989',
        'light-gray-bg': '#d9d9d9',
      },
      textColor: {
        'green-txt': '#26A34F',
        'dark-gray-txt': '#727C86',
      },
      backgroundImage: {
        vignette:
          'radial-gradient(circle, transparent 50%, rgba(0,0,0,0.8) 130%)',
      },
      fontFamily: {
        sinoreta: ['Sinoreta', 'sans-serif'],
        sans: ['NotoSansKR', 'sans-serif'],
      },
      colors: {
        customGray: '#BCC2C4',
        customDarkGray: '#727C86',
        customLightGray: '#C0C0C3',
        customGreen: '#26A34F',
        customRed: '#FF0000',
        darkGray: '#C0C0C3',
      },
      boxShadow: {
        green: '0 0 8px 3px rgba(0, 255, 0, 0.5)',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'rotate(0)' },
          '10%': { transform: 'rotate(-5deg)' },
          '20%': { transform: 'rotate(5deg)' },
          '30%': { transform: 'rotate(-5deg)' },
          '40%': { transform: 'rotate(5deg)' },
          '50%': { transform: 'rotate(0)' },
          '60%': { transform: 'rotate(5deg)' },
          '70%': { transform: 'rotate(-5deg)' },
          '80%': { transform: 'rotate(5deg)' },
          '90%': { transform: 'rotate(-5deg)' },
        },
      },
      animation: {
        shake: 'shake 2s ease-in-out',
      },
    },
  },
  plugins: [],
};
