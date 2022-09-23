/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      'main-purple': '#635FC7',
      'main-purple-hover': '#A8A4FF',
      black: '#000112',
      'subtask-complete-lght': 'rgba(0, 1, 18, 0.5)',
      'subtask-complete-drk': 'rgba(255, 255, 255, 0.5)',
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
      'input-idle': 'rgba(130, 143, 163, 0.25)',
      'input-place': 'rgba(0, 0, 18, 0.25)',
      transparent: 'transparent',
      'checkbox-border': 'rgba(130, 143, 163, 0.248914)',
    },
    extend: {
      backgroundImage: {
        'custom-check': 'url(./assets/icon-check.svg)',
      },
      backgroundSize: {
        auto: 'auto',
        cover: 'cover',
        contain: 'contain',
        '80%': '80%',
      },
    },
  },
  plugins: [],
}
