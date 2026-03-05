/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#f20d0d",
        "background-light": "#f8f5f5",
        "background-dark": "#221010",
        "surface-light": "#ffffff",
        "surface-dark": "#331818",
        "text-main-light": "#181111",
        "text-main-dark": "#f5f0f0",
        "text-muted-light": "#8a6060",
        "text-muted-dark": "#d1b3b3",
        "border-light": "#e6dbdb",
        "border-dark": "#4a2525",
      },
      fontFamily: {
        "display": ["Lexend", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
