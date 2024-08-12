/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "grayy": "rgba(0, 0, 0, 0.12)",
        "grayyy": "rgba(0, 0, 0, 0.12)",
        "grayyyy": "rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};
