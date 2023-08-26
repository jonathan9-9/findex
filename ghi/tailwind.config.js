/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGreen: 'rgba(106, 198, 154, 1)',
        customLightGray: 'rgba(133, 127, 127, 1)',
        customBlue: 'rgba(90, 166, 255, 1)'
      },
      fontFamily: {
        weather: ["Merriweather", "serif"],
      }
    },
  },
  plugins: [],
}
