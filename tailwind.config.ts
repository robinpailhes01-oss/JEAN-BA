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
        // Écart marqué soft → card pour que le "lift" au survol se sente
        soft: "0 10px 40px -12px rgba(45, 80, 22, 0.16)",
        card: "0 22px 55px -14px rgba(45, 80, 22, 0.32)",
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
        "rise-in": {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.8s ease forwards",
        // Entrée échelonnée CSS (en-têtes de page) — pas de JS, donc gratuit en bundle
        "rise-in": "rise-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        // Indicateur de scroll feutré (remplace animate-bounce générique)
        float: "float 2.4s cubic-bezier(0.45, 0, 0.55, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
