/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}'
    ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'bright-green': '#10E62C',
        'bright-pink': '#D90368',
        'bright-orange': '#FF4D00',
        'bright-blue': '#5CE1E6',
        'bright-yellow': '#FFE347',
        'bright-blue-2': '#004AAD',
        'bright-purple': '#CB6CE6',
      },
      fontFamily: {
        mono: ['var(--font-anton)', 'var(--font-libreBaskerville)'],
      },
      fontSize: {
        '10xl': '10rem',
        '11xl': '11rem',
      }
    },

  },
  plugins: [],
}
