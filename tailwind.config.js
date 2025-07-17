/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryRed: '#CE1C1C',
        primaryRedHover: '#B11414',
        buttonHoverAccent: '#B11414',  
        lightGrayBackground: '#F5F5F5',
        darkText: '#2F2F2F',
        border: '#D1D5DB',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}