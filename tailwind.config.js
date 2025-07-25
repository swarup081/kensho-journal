/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-background': '#F9F9F7',
        'brand-text': '#2C2C2C',
        'brand-text-light': '#5A5A5A',
        'brand-primary-yellow': '#F9D423',
        'brand-primary-pink': '#FF4E50',
        'brand-ui-bg': 'rgba(255, 255, 255, 0.7)',
        'brand-ui-stroke': 'rgba(230, 230, 230, 0.8)',
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        lora: ['"Lora"', 'serif'],
      },
      boxShadow: {
        'brand-card': '0px 30px 60px -20px rgba(50, 50, 93, 0.15), 0px 18px 36px -18px rgba(0, 0,0, 0.2)',
        'brand-button': '0px 10px 20px -5px rgba(249, 212, 35, 0.3)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(90deg, #F9D423 0%, #FF4E50 100%)',
      }
    },
  },
  plugins: [],
};