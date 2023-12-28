/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['"Poppins",']
      },
      colors: {
        // 'main':'#fca311' ,
        'main': '#A8763E',
        // 'main': '#d69f7e',
        // 'main': '#c88d6d',

      },
      blur: {
        xs: '1px',
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ],
}