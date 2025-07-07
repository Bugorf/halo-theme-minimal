/** @type {import('tailwindcss').Config} */
const { addDynamicIconSelectors } = require("@iconify/tailwind");
module.exports = {
  content: ["./templates/**/*.html", "./src/main.ts", "./templates/assets/js/main.js"],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        'bg-color': 'var(--bg-color)',
        'text-color': 'var(--text-color)',
        'text-light': 'var(--text-light)',
        'text-lighter': 'var(--text-lighter)',
        'text-lightest': 'var(--text-lightest)',
        'border-color': 'var(--border-color)',
        'border-color-dark': 'var(--border-color-dark)',
        'card-bg': 'var(--card-bg)',
        'hover-bg': 'var(--hover-bg)',
        'bg-tag': 'var(--bg-tag)',
        'shadow': 'var(--shadow)',
        'accent-color':'var(--accent-color)',
        'success-color':'var(--success-color)',
        'error-color':'var(--error-color)',
        'info-color':'var(--info-color)'
      },
    },
  },
  plugins: [
    addDynamicIconSelectors(),
  ],
  safelist: [
    "prose-sm",
    "prose-base",
    "prose-lg",
    "prose-xl",
    "prose-2xl",
    "prose-gray",
    "prose-slate",
    "prose-zinc",
    "prose-neutral",
    "prose-stone"
  ],
};