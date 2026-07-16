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
        // Mavi aksan — vurgu rozetleri, odak halkaları, tek dikkat çekici CTA'lar.
        accent: {
          50: "#eef2ff",
          100: "#dbe7ff",
          200: "#b9cffc",
          300: "#8caefb",
          400: "#5b82ea",
          500: "#2f5fe0",
          600: "#1d4ed8",
          700: "#153f9e",
          800: "#12327d",
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
      },
    },
  },
  plugins: [],
};
