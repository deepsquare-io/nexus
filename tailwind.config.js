/** @type import('tailwindcss').TailwindConfig */
const conf = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    preflight: false, // We are using MUI CSS Baseline instead https://mui.com/components/css-baseline/
  },
  important: true, // Cannot be used atm because MUI spawns dialogs outside #__next
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        sm: '100%',
        md: '100%',
        lg: '1000px',
        xl: '1200px',
      },
    },
    extend: {
      colors: {
        primary: '#6753FF', // Branded pink
        secondary: '#FFFFFF', // White
        neutral: '#182955', // Dark blue
        highlight: '#5EEAD4',
        background: '#F5F6F8',
        error: '#c62828', // MUI palette.error.dark
        warning: '#e65100', // MUI palette.warning.dark
        info: '#01579b', // MUI palette.info.dark
        success: '#1b5e20', // MUI palette.success.dark
      },
    },
  },
};

module.exports = conf;
