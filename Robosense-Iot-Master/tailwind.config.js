/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        romansStyle: ["font-romans", "sans-serif"],
        inter: ["Inter"],
        jost: ["Jost"],
        montserrat: ["Montserrat"],
        poppins: ["Poppins"],

      },
    },
  },
  plugins: [],
};
