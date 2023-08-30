/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.html", "./dist/*/*.html"],
  theme: {
    screens: {
      xs: "100px",
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        lightGray: "#F3F2F0",
        primaryBlue: "#0a66c2",
      },
    },
  },
  plugins: [],
};
