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
        bg: '#0f0f23',
        panel: '#1a1a2e',
        accent: '#667eea',
        good: '#4caf50',
        bad: '#f44336',
      },
      keyframes: {
        pulse: { '0%,100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.05)' } },
        bounce: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
      },
      animation: { pulse: 'pulse 1s ease-in-out infinite', bounce: 'bounce 1s ease-in-out infinite' },
    },
  },
  plugins: [],
};