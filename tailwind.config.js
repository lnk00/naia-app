export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        dark: '#2A2D32',
        main: '#048C8C',
        secondary: '#FFB480',
      },
    },
  },
  plugins: [],
};
