/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--background))',
        foreground: 'rgb(var(--foreground))',
        muted: 'rgb(var(--muted))',
        border: 'rgb(var(--border))',
        accent: '#3b82f6',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'rgb(var(--foreground))',
            maxWidth: 'none',
            h1: { color: 'rgb(var(--foreground))', fontFamily: 'var(--font-serif), serif' },
            h2: { color: 'rgb(var(--foreground))', fontFamily: 'var(--font-serif), serif' },
            h3: { color: 'rgb(var(--foreground))', fontFamily: 'var(--font-serif), serif' },
            h4: { color: 'rgb(var(--foreground))', fontFamily: 'var(--font-serif), serif' },
            strong: { color: 'rgb(var(--foreground))' },
            code: { color: 'rgb(var(--foreground))' },
            blockquote: { color: 'rgb(var(--muted))' },
            a: { color: '#3b82f6' },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}