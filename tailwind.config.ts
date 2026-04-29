import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Ye line sabse zaroori hai
    "./app/page.tsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;