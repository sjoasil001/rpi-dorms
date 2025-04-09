export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'sans-serif'],      // for body text
          display: ['Anton', 'sans-serif'],   // for bold headers
        },
      },
    },
    plugins: [
      require('tailwind-scrollbar-hide'),
    ],
  }
  