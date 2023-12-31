/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['"Nunito",']
      },
      colors: {
        // 'main': '#A8763E',
        // 'main':'#fb6f92',
        // 'main':'#0b090a',
        // 'main':'#ba181b',
        // 'main':'#55a630',
        // 'main':'#4361ee',
        // 'main':'#e7bc91',
        // 'main':'#588157',
        // 'main':'#6c757d',
        // 'main':'#b9375e',
        'main':'#ffa200',

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