/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['"Poppins",']
      },
      colors: {
        // 'main': '#A8763E',
        'main': '#181f1c',
      },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ],
}