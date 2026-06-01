/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#050608",
        foreground: "#f8fafc",
        muted: "#8b96a7",
        card: "rgba(255,255,255,0.06)",
        border: "rgba(255,255,255,0.12)",
        primary: {
          DEFAULT: "#34d399",
          foreground: "#02120d"
        },
        accent: {
          cyan: "#22d3ee",
          violet: "#a78bfa",
          rose: "#fb7185"
        }
      },
      boxShadow: {
        glow: "0 0 48px rgba(52, 211, 153, 0.18)",
        glass: "0 24px 80px rgba(0, 0, 0, 0.38)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite"
      }
    }
  },
  plugins: []
};
