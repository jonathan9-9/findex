/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGreen: 'rgba(106, 198, 154, 1)',
        darkGray: 'rgba(99,102,106)',
        customBlue: 'rgba(90, 166, 255, 1)',
        customGreenOne: '#0F3443',
        customGreenTwo: '#34E89E'
      },
      fontFamily: {
        weather: ["Merriweather", "serif"],
      }

      colors: {
        customGreen: 'rgba(106, 198, 154, 1)',
        customLightGray: 'rgba(133, 127, 127, 1)',
        customBlue: 'rgba(90, 166, 255, 1)',
        customGreenOne: '#0F3443',
        customGreenTwo: '#34E89E'
      },
      fontFamily: {
        weather: ["Merriweather", "serif"],
      }
    },
  },
  plugins: [],
}
