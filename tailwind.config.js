/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['"Poppins",']
      },
      colors: {
        'main': '#A8763E',
      },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ],
}