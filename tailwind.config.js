<<<<<<< HEAD
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
  
=======
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Anton', 'sans-serif'],
      },
      animation: {
        glow: 'glow 4s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
      backgroundSize: {
        '200%': '200% 200%',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}
>>>>>>> 5a630bccd0bf2f8901c0b3b4c16f6b76d2df010b
