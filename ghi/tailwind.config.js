/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGreen: 'rgba(106, 198, 154, 1)'
      }
    },
  },
  plugins: [],
}
