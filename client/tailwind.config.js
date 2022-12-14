/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
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
      teal: '#49C4E5',
      'aqua-green': '#67E2AE',
      overlay: 'rgb(0, 0, 0, 0.5);',
    },
    extend: {
      backgroundImage: {
        'custom-check': 'url(./assets/icon-check.svg)',
        'show-sidebar': 'url(./assets/icon-show-sidebar.svg)',
        'vertical-ellipsis': 'url(./assets/icon-vertical-ellipsis.svg)',
        board: 'url(./assets/icon-board.svg)',
        'logo-dark': 'url(./assets/logo-dark.svg)',
        'logo-light': 'url(./assets/logo-light.svg)',
        'logo-mobile': 'url(./assets/logo-mobile.svg)',
      },
      backgroundSize: {
        auto: 'auto',
        cover: 'cover',
        contain: 'contain',
        '80%': '80%',
      },
    },
    screens: {
      mobile: '375px',
      tablet: '550px',
      desktop: '1440px',
    },
  },
  plugins: [],
}
