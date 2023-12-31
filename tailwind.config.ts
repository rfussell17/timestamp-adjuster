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
        "deep-blue": "#020480",
        "cool-gray": "#c0c0c0;",
        "indigo-600": "#020480"
      },
      fontFamily: {
        sans: ["Pixelated MS Sans Serif", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
