import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Charte Jean Ba Paysagiste
        forest: {
          DEFAULT: "#2D5016", // Vert Forêt — couleur principale
          dark: "#22400F",
          light: "#3C6A1F",
        },
        leaf: {
          DEFAULT: "#7CB342", // Vert Feuille — accent / CTA
          dark: "#6BA033",
          light: "#8FC457",
        },
        cream: "#FAF6EF", // Arrière-plans
        beige: {
          DEFAULT: "#E8DFC9", // Sections secondaires
          dark: "#DCD0B4",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.25em",
      },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(45, 80, 22, 0.18)",
        card: "0 8px 30px -10px rgba(45, 80, 22, 0.22)",
      },
      transitionTimingFunction: {
        // Easing "luxe" — lent et subtil
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.8s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
