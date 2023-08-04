/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}'
    ],
  theme: {
    screens: {
       // default = mobile
      'xs': '320px', // mobile

      'sm': '480px', // tablet

      'md': '768px', // small laptop

      'lg': '1024px', // large laptop

      'xl': '1200px', // desktop

      '2xl': '1536px', // large desktop
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'bright-green': { // malachite
          'DEFAULT': '#10e62c',
          '50': '#e6ffe7',
          '100': '#c9fecc',
          '200': '#99fda2',
          '300': '#5ef86d',
          '400': '#2eed43',
          '500': '#10e62c',
          '600': '#07a91f',
          '700': '#0b801e',
          '800': '#0f651e',
          '900': '#11561f',
          '950': '#03300d',
        },
        'bright-pink': { // razzmatazz
          'DEFAULT': '#d90368',
          '50': '#fef1f9',
          '100': '#ffe4f5',
          '200': '#ffc9ec',
          '300': '#ff9eda',
          '400': '#ff61c0',
          '500': '#ff33a4',
          '600': '#f21081',
          '700': '#d90368',
          '800': '#ae0653',
          '900': '#910a48',
          '950': '#590027',
        },
        'bright-orange': { // vermilion
          'DEFAULT': '#FF4D00',
          '50': '#fff6ec',
          '100': '#ffebd3',
          '200': '#ffd3a5',
          '300': '#ffb46d',
          '400': '#ff8932',
          '500': '#ff670a',
          '600': '#ff4d00',
          '700': '#cc3502',
          '800': '#a12a0b',
          '900': '#82250c',
          '950': '#460f04',
        },
        'bright-blue': { // turquoise
          'DEFAULT': '#5CE1E6',
          '50': '#eefdfd',
          '100': '#d4f9f9',
          '200': '#aef2f3',
          '300': '#5ce1e6',
          '400': '#37d1d9',
          '500': '#1bb4bf',
          '600': '#1991a1',
          '700': '#1b7483',
          '800': '#1f5f6b',
          '900': '#1e4f5b',
          '950': '#0e343e',
        },
          'bright-yellow': { // gorse
          'DEFAULT': '#fdd012',
          '50': '#fefce8',
          '100': '#fffac2',
          '200': '#fff289',
          '300': '#ffe347',
          '400': '#fdd012',
          '500': '#ecb606',
          '600': '#cc8c02',
          '700': '#a36305',
          '800': '#864e0d',
          '900': '#724011',
          '950': '#432005',
        },
        'bright-blue-2': { // cobalt
          'DEFAULT': '#004AAD',
          '50': '#ebf8ff',
          '100': '#d1f1ff',
          '200': '#aee7ff',
          '300': '#76daff',
          '400': '#35c3ff',
          '500': '#079fff',
          '600': '#0079ff',
          '700': '#0060ff',
          '800': '#004fd7',
          '900': '#004aad',
          '950': '#062c65',
        },
        'bright-purple': { // lavender
          'DEFAULT': '#cb6ce6',
          '50': '#fbf5fe',
          '100': '#f7eafd',
          '200': '#f0d4fa',
          '300': '#e6b1f6',
          '400': '#d783ef',
          '500': '#cb6ce6',
          '600': '#a834c5',
          '700': '#8e27a4',
          '800': '#752286',
          '900': '#63216e',
          '950': '#3f0a48',
        }, 
        'bright-purple-2': { // honey flower
          'DEFAULT': '#5E1474',
          '50': '#fcf5ff',
          '100': '#f8e7ff',
          '200': '#f2d3ff',
          '300': '#e8b1ff',
          '400': '#db7fff',
          '500': '#cd4ffd',
          '600': '#bc2cf1',
          '700': '#a51cd4',
          '800': '#891cad',
          '900': '#5e1474',
          '950': '#500368',
        },
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
}
