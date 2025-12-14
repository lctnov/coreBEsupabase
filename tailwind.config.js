/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/**/**/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background-light": "#cbc8c8ff",
        "background-dark": "#0a0a0aff",
        // "text-light": "#0a0a0aff",
        // "text-dark": "#cbc8c8ff",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
