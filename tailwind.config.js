/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./script/**/*.js"],
  theme: {
    extend: {
      colors: {
        "btn-primary": "rgb(14, 122, 129)",
        "color-primary": "rgb(19, 19, 19)",
        "color-secondary": "rgb(19, 19, 19, 0.6)",
        "color-finely": "rgb(19, 19, 19, 0.7)",
        background: "rgb(243, 243, 245)",
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      gridTemplateRows: {
        20: "repeat(20, minmax(0, 1fr))",
      },
    },
  },
  plugins: [require("daisyui")],
};
