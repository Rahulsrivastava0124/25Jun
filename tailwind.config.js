/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg:          '#FAFAF8',
        surface:     '#F5F3EF',
        card:        '#FFFFFF',
        warm:        '#F0EDE8',
        gold:        '#B8965A',
        'gold-lt':   '#C9A96E',
        'gold-dk':   '#8B6E3A',
        ink:         '#1A1814',
        'ink-mid':   '#5A5248',
        'ink-dim':   '#9E9088',
      },
      fontFamily: {
        display: ['"EB Garamond"', 'Georgia', 'serif'],
        body:    ['"Nunito Sans"', 'system-ui', 'sans-serif'],
        mono:    ['"Courier Prime"', '"Courier New"', 'monospace'],
      },
    },
  },
  plugins: [],
}
