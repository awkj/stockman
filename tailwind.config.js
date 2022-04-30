const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
  },
  plugins: [
    require('flowbite/plugin'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '&::-webkit-scrollbar': {
            display: 'none',
          }
        },
        '.top-84px': {
          top: '84px'
        },
        '.bottom-52px': {
          bottom: '52px'
        },
        '.blur-mini': {
          filter: 'blur(2px)'
        },
      })
    })
  ],
}
