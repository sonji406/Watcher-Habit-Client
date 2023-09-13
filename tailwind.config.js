/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'main-bg': '#27313C',
        'gray-bg': '#BCC2C4',
        'green-bg': '#26A34F',
      },
      backgroundImage: {
        vignette:
          'radial-gradient(circle, transparent 50%, rgba(0,0,0,0.8) 130%)',
      },
      fontFamily: {
        sinoreta: ['Sinoreta', 'sans-serif'],
      },
      color: {
        'custom-dark-gray': '#727C86',
        'custom-green': '#26A34F',
      },
    },
  },
  plugins: [],
};
