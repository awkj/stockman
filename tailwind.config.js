const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '&::-webkit-scrollbar': {
            display: 'none',
            width: '0px'
          }
        }
      })
    })
  ],
}
