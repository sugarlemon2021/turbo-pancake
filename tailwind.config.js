const tailwindDebugScreens = require('tailwindcss-debug-screens');

module.exports = {
  purge: ['./src/**/*.html', './src/**/*.ts', './src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: '#1eb6a9',
      white: '#fff'
    },
    fontFamily: {
      roboto: ['Roboto', 'Helvetica', 'Arial', 'sans-serif']
    },
    screens: {
      xs: '0',
      sm: '600px',
      // => @media (min-width: 600px) { ... }
      md: '900px',
      // => @media (min-width: 900px) { ... }
      lg: '1200px',
      // => @media (min-width: 1200px) { ... }
      xl: '1800px'
      // => @media (min-width: 1800px) { ... }
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: [tailwindDebugScreens],
  important: true
};
