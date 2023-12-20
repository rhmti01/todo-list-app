/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['"Poppins",']
      },
      colors: {
        'main': '#4338CA',
      },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ],
}