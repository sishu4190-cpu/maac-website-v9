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
        green: {
          50: "#f0f9f0",
          100: "#dcefdc",
          200: "#bde0bd",
          300: "#91c891",
          400: "#5fa85f",
          500: "#3d8b3d",
          600: "#2d6e2d",
          700: "#1e5c1e",
          800: "#154715",
          900: "#0d2e0d",
          950: "#071a07",
        },
        deepGreen: {
          DEFAULT: "#1a4d2e",
          dark: "#0f2d1a",
          light: "#2d6e47",
        },
        freshGreen: {
          DEFAULT: "#4caf50",
          light: "#81c784",
          dark: "#388e3c",
        },
        orange: {
          DEFAULT: "#f4a228",
          light: "#f9c06a",
          dark: "#c47f10",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
