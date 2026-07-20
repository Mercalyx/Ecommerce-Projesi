/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./App.jsx",
    "./Header.jsx",
    "./Footer.jsx",
    "./main.jsx",
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./context/**/*.{js,jsx}",
    "./data/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        // Nötr siyah/gri marka paleti (metin, arka plan, kenarlık, siyah CTA'lar).
        brand: {
          50: "#f7f8fa",
          100: "#f0f1f3",
          200: "#e5e7eb",
          300: "#d0d3d8",
          400: "#9aa0a6",
          500: "#8a8f96",
          600: "#4b5157",
          700: "#2c2f33",
          800: "#17181a",
          900: "#0a0a0a",
          950: "#000000",
        },
        // Yeşil aksan — vurgu rozetleri, odak halkaları, tek dikkat çekici CTA'lar.
        accent: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
      },
      boxShadow: {
        card: "0 1px 2px rgba(10, 10, 10, 0.05), 0 8px 24px -12px rgba(10, 10, 10, 0.15)",
        "card-hover": "0 4px 12px rgba(10, 10, 10, 0.08), 0 16px 32px -12px rgba(10, 10, 10, 0.22)",
        popover: "0 12px 40px -8px rgba(10, 10, 10, 0.3)",
      },
      animation: {
        "fade-in": "fadeIn 0.2s ease-out",
        "slide-down": "slideDown 0.18s ease-out",
        "bb-wobble": "bbWobble 0.5s ease-in-out infinite",
        "bb-crack-flash": "bbCrackFlash 0.35s ease-in-out infinite",
        "bb-pop-in": "bbPopIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "bb-shimmer": "bbShimmer 1.6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        bbWobble: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        bbCrackFlash: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        bbPopIn: {
          "0%": { opacity: "0", transform: "scale(0.6) translateY(12px)" },
          "60%": { opacity: "1", transform: "scale(1.05) translateY(-2px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        bbShimmer: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
