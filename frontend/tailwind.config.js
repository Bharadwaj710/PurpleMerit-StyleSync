/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        app: '#f5f1e8',
        ink: '#142033',
        panel: '#fffdf8',
        mist: '#e7edf4',
        line: '#d8dfeb',
        accent: '#4f7cff',
        accentSoft: '#77d6c9',
      },
      boxShadow: {
        soft: '0 24px 70px -34px rgba(20, 32, 51, 0.24)',
        panel: '0 28px 90px -42px rgba(20, 32, 51, 0.22)',
      },
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        body: ['"Manrope"', 'sans-serif'],
      },
      backgroundImage: {
        glow:
          'radial-gradient(circle at top left, rgba(79, 124, 255, 0.14), transparent 32%), radial-gradient(circle at top right, rgba(119, 214, 201, 0.12), transparent 28%), radial-gradient(circle at bottom center, rgba(20, 32, 51, 0.05), transparent 34%)',
      },
    },
  },
  plugins: [],
};
