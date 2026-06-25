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
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-hanken)", "system-ui", "sans-serif"],
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
        // Élévation prononcée au survol des cartes premium
        lift: "0 40px 80px -24px rgba(34, 64, 15, 0.45)",
        // Lueur verte pour les CTA / accents
        glow: "0 0 0 1px rgba(124,179,66,0.25), 0 18px 50px -16px rgba(124,179,66,0.55)",
      },
      transitionTimingFunction: {
        // Easing "luxe" — lent et subtil
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
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
        // Zoom cinématographique très lent du fond hero (Ken Burns)
        kenburns: {
          "0%": { transform: "scale(1.08)" },
          "100%": { transform: "scale(1.18)" },
        },
        // Défilement infini des communes
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        // Reflet qui balaie (badges, séparateurs)
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        // Pulsation douce d'un halo
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.9" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.8s ease forwards",
        // Entrée échelonnée CSS (en-têtes de page) — pas de JS, donc gratuit en bundle
        "rise-in": "rise-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        // Indicateur de scroll feutré (remplace animate-bounce générique)
        float: "float 2.4s cubic-bezier(0.45, 0, 0.55, 1) infinite",
        kenburns: "kenburns 18s ease-out both",
        marquee: "marquee 40s linear infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
