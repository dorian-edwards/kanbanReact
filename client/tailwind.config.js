/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      'main-purple': '#635FC7',
      'main-purple-hover': '#8A84FF',
      black: '#000112',
      white: '#FFFFFF',
      'light-gray': '#E4EBFA',
      'light-gray-bg': '#F4F7FD',
      'med-gray': '#828FA3',
      'dark-gray': '#2B2C37',
      'v-dark-gray': '#20212C',
      'lines-dark': '#3E3F4E',
      red: '#EA5555',
      'red-hover': '#FF9898',
      'main-purple-opaque': 'rgba(99, 95, 199, 0.1)',
      'main-purple-opaque-hover': 'rgba(99, 95, 199, 0.25)',
    },
    extend: {},
  },
  plugins: [],
}
