/* tailwind.config.js */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'dark-purple': {
          700: '#3b0d5b',
          800: '#2a0842',
          900: '#1f0730',
        },
      },
      screens: {
        'lg': '992px',
      },
    },

  },
  plugins: [
    require('tw-elements/dist/plugin'),
  ]
}
