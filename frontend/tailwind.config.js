/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kakao: '#FEE500',
        // Design System Colors
        'brand-black': '#1F1F1F',      // Main Background
        'brand-navy': '#0E1A28',       // Sidebar / Panel
        'brand-blue': '#3545D6',       // Primary Action
        'brand-blue-light': '#5363EE', // Hover / Secondary
        'brand-lime': '#C2F750',       // Accent / Highlight
      }
    },
  },
  plugins: [],
}
