import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: "#fdf8f3",
          100: "#f7ead8",
          200: "#eed5b0",
          300: "#e1b87e",
          400: "#d49550",
          500: "#c47a2e",
          600: "#a86122",
          700: "#8a4a1c",
          800: "#6e3a17",
          900: "#4a2610",
          950: "#2d1509",
        },
        vault: {
          dark: "#1a1209",
          card: "#231a0e",
          border: "#3d2e1a",
          muted: "#9c8060",
          light: "#f5ede0",
        },
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
