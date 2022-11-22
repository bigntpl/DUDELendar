/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dudegray": "#1e1e1e",
        "dudepink": "#fa4b75",
      }
    },
  },
  plugins: [],
}
