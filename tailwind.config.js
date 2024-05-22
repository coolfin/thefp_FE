/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      backgroundColor: {
        theme: "#294936",
      },
      colors: {
        theme: "#294936",
      },
      borderColor: {
        theme: "#294936",
      },
      backgroundImage: {
        "footer-texture": "url('/assets/footer-background.jpg')",
      },
    },
  },
  plugins: [],
};
