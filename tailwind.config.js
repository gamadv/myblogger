/** @type {import('tailwindcss').Config} */
const { join } = require("path");

module.exports = {
  content: [
    join(__dirname, "./pages/**/*.{js,ts,jsx,tsx}"),
    join(__dirname, "./src/**/*.{js,ts,jsx,tsx}"),
  ],
  plugins: [require("@tailwindcss/line-clamp"), require("tailwind-scrollbar")],

  theme: {
    extend: {},
  },
};
