import lineClamp from "@tailwindcss/line-clamp";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Habilitar modo oscuro basado en clase
  theme: {
    extend: {
      animation: {
        slideDown: "slideDown 1s ease-in-out forwards",
      },
      keyframes: {
        slideDown: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        lightBackground: "#ffffff",
        darkBackground: "#1a202c",
        lightText: "#000000",
        darkText: "#f7fafc",
      },
    },
  },
  plugins: [lineClamp],
};
