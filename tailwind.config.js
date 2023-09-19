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
    },
  },
  plugins: [],
};
