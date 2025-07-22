/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          'background': '#F9F9F7',     // Our soft, off-white background
          'brand-accent': '#D97706',  // Our warm, ochre accent color
          'brand-text': '#2d2d2d',     // Our dark charcoal text
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'], // Sets Inter as the default sans-serif font
          serif: ['Lora', 'serif'],       // Sets Lora as the default serif font
        },
      },
    },
    plugins: [],
  };
  