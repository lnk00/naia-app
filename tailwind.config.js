export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Jost'],
        heading: ['Mackinac'],
      },
      colors: {
        dark: '#2A2D32',
        main: '#83F9D6',
        lightGray: '#EFF1F6',
      },
    },
  },
  plugins: [],
};
