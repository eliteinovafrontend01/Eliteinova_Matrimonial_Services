// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pacifico: ['Pacifico', 'cursive'],
      },
      backgroundImage: {
        'gradient-red-yellow': 'linear-gradient(to right, #dc2626, #f59e0b, #dc2626)',
      },
    },
  },
  plugins: [],
}