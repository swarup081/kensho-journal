/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          'brand-background': '#F9F9F7',
          'brand-accent-start': '#F59E0B',
          'brand-accent-end': '#D946EF',
          'brand-text': '#2d2d2d',
        },
        fontFamily: {
          sans: ['var(--font-inter)', 'sans-serif'],
          serif: ['var(--font-lora)', 'serif'],
        },
      },
    },
    plugins: [],
  };