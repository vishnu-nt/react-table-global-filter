/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.tsx", "./src/**/*.css"],
  theme: {
    extend: {
      colors: {
        'grey-1': 'lightgray',
        'primary': '#635ff0',
        'primary-lite': '#7f7cf9'
      }
    }
  }
};

