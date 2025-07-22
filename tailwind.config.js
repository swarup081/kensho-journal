/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          'brand-background': '#F9F9F7', // Soft off-white for light theme
          'brand-card': '#FFFFFF',
          'brand-text': '#2d2d2d',       // Dark charcoal text
          'brand-accent-start': '#F59E0B', // Gold for gradient
          'brand-accent-end': '#D946EF',   // Magenta for gradient
        },
        fontFamily: {
          sans: ['var(--font-inter)', 'sans-serif'],
          serif: ['var(--font-lora)', 'serif'],
        },
      },
    },
    plugins: [],
  };