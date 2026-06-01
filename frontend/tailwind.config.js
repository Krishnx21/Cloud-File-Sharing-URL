/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0b0d10",
        foreground: "#f4f1ea",
        muted: "#8f9aa7",
        card: "#12161b",
        border: "rgba(244, 241, 234, 0.1)",
        primary: {
          DEFAULT: "#d6b26e",
          foreground: "#17130b"
        },
        accent: {
          cyan: "#8fb8c8",
          violet: "#9b8fb8",
          rose: "#d08b85"
        }
      },
      boxShadow: {
        glow: "0 10px 30px rgba(214, 178, 110, 0.12)",
        glass: "0 18px 48px rgba(0, 0, 0, 0.28)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      keyframes: {},
      animation: {}
    }
  },
  plugins: []
};
