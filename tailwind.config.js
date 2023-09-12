/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'main-bg': '#27313C',
        'main-green': '#26A34F',
      },
      backgroundImage: {
        vignette:
          'radial-gradient(circle, transparent 50%, rgba(0,0,0,0.8) 130%)',
      },
      fontFamily: {
        sinoreta: ['Sinoreta', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
