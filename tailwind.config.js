/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },

    color: {
      darkGreen: '#009438',
      borderGrey: '#A2A2A2',
      tintGrey: '#888888',
      darkPurple:'#5200BD',
      darkRed: '#EC554B'

    },

    extend: {
      colors: {
        darkGreen: '#009438',
        borderGrey: '#A2A2A2',
        tintGrey: '#888888',
        darkPurple:'#5200BD',
        darkRed: '#EC554B'
      },
    },
  },
  plugins: [],
};
