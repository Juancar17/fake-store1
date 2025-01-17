/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Habilitar modo oscuro basado en clase
  theme: {
    extend: {
      animation: {
        slideDown: "slideDown 1s ease-in-out forwards",
        slideUp: "slideUp 1s ease-in-out forwards",
        fadeIn: "fadeIn 1s ease-in-out forwards",
      },
      keyframes: {
        slideDown: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
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
  plugins: [],
};
