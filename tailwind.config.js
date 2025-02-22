/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4F46E5', // Indigo-600
        'primary-dark': '#4338CA', // Indigo-700
      }
    },
  },
  plugins: [],
}
