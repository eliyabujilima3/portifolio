/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      colors: {
        navy: {
          DEFAULT: "#7c8699",
          light: "#7e8799",
          dark: "#57668a",
        },
        royal: {
          DEFAULT: "#7a87b8",
          light: "#626c8f",
          dark: "#1E3FCC",
        },
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #5b6c8d 0%, #122A5C 45%, #2F5CFF 100%)",
        "accent-gradient": "linear-gradient(90deg, #2F5CFF 0%, #5B7FFF 100%)",
      },
      boxShadow: {
        card: "0 4px 24px -4px rgba(10, 27, 61, 0.12)",
        "card-dark": "0 4px 24px -4px rgba(0, 0, 0, 0.4)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        blink: "blink 1s step-start infinite",
      },
    },
  },
  plugins: [],
};
