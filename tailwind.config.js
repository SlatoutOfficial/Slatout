/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          50: "#FFF3ED",
          100: "#FEE2D4",
          200: "#FDC4A7",
          300: "#FBA980",
          400: "#FA8E59",
          500: "#F97432", // Core signature color replacement
          600: "#E65F1D", // Hover states
          700: "#C24C12",
          800: "#9A3C10",
          900: "#7C300F",
        },
        violet: {
          50: "#FAF5FF",
          100: "#F3E8FF",
          200: "#E9D5FF",
          300: "#D8B4FE",
          400: "#C084FC",
          500: "#A855F7",
          600: "#9333EA",
          700: "#7E22CE",
          800: "#6B21A8",
          900: "#581C87",
        }
      }
    },
  },
  plugins: [],
};
